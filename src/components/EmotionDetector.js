import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

export const EmotionDetector = () => {
  const [model, setModel] = useState(null);
  const [emoji, setEmoji] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const URL = 'https://teachablemachine.withgoogle.com/models/2iJbWQSco/';
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const detectEmotion = async () => {
      if (model && videoRef.current) {
        const image = tf.browser.fromPixels(videoRef.current);
        const predictions = await model.predict(image.expandDims(0)).data();
        const topPredictionIndex = predictions.indexOf(Math.max(...predictions));
        const emojis = ['😠', '😞', '😐', '😊', '😍'];
        setEmoji(emojis[topPredictionIndex]);
      }
      requestAnimationFrame(detectEmotion);
    };
    detectEmotion();
  }, [model]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} width={300} height={300} style={{ display: 'none' }} />
      <h1>{emoji}</h1>
    </div>
  );
};