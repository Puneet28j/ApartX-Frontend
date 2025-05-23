// import { useEffect, useState, useRef } from "react";
// import { BrowserQRCodeReader } from "@zxing/browser";

// const ZXingScanner = () => {
//   const [result, setResult] = useState("");
//   const [error, setError] = useState("");
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const codeReader = useRef(new BrowserQRCodeReader());

//   useEffect(() => {
//     const startScanning = async () => {
//       try {
//         const devices = await BrowserQRCodeReader.listVideoInputDevices();
//         const constraints = {
//           video: {
//             deviceId: devices[0].deviceId,
//             width: { ideal: 1280 },
//             height: { ideal: 720 },
//           },
//         };

//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;

//           codeReader.current.decodeFromVideoDevice(
//             devices[0].deviceId,
//             videoRef.current,
//             (result, error) => {
//               if (result) {
//                 setResult(result.getText());
//               }
//               if (error) {
//                 setError(
//                   error instanceof Error
//                     ? error.message
//                     : "An unknown error occurred"
//                 );
//               }
//             }
//           );
//         }
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       }
//     };

//     startScanning();

//     return () => {
//       codeReader.current.reset();
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h2>ZXing Scanner</h2>
//       {error && <p className="error">Error: {error}</p>}

//       <video
//         ref={videoRef}
//         style={{ width: "100%", maxWidth: "600px" }}
//         autoPlay
//         playsInline
//       />

//       {result && (
//         <div>
//           <h3>Scanned Result:</h3>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ZXingScanner;
