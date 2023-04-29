import React, { useEffect, useRef } from 'react';
import * as faceapi from '@vladmandic/face-api';

export const EmotionDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.loadSsdMobilenetv1Model('/');
      await faceapi.loadFaceExpressionModel('/');
    };
    loadModels();
  }, []);

  const detectEmotions = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  };

  return (
    <div>
      <video ref={videoRef} width="720" height="560" autoPlay muted></video>
      <canvas ref={canvasRef} width="720" height="560"></canvas>
      <button onClick={detectEmotions}>Detect Emotions</button>
    </div>
  );
};
