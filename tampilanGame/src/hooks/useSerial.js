import { useEffect } from "react";

export default function useSerial(onDataReceived) {
  useEffect(() => {
    let reader;
    let port;

    const connect = async () => {
      try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        const decoder = new TextDecoderStream();
        await port.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable.getReader();

        while (true) {
          const { value, done } = await inputStream.read();
          if (done) break;
          if (value) onDataReceived(value.trim());
        }

        reader.releaseLock();
      } catch (error) {
        console.error("Serial error:", error);
      }
    };

    connect();

    return () => {
      if (reader) reader.cancel();
      if (port) port.close();
    };
  }, [onDataReceived]);
}
