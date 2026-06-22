const POSE_VERSION = "0.5.1675469404";
const CAMERA_VERSION = "0.3.1675466862";
const DRAWING_VERSION = "0.3.1675466124";

export interface PoseResults {
  poseLandmarks?: Array<{
    x: number;
    y: number;
    z: number;
    visibility?: number;
  }>;
  image?: CanvasImageSource;
}

export interface MediaPipePose {
  setOptions: (options: Record<string, unknown>) => void;
  onResults: (callback: (results: PoseResults) => void) => void;
  send: (input: { image: CanvasImageSource }) => Promise<void>;
  close: () => Promise<void>;
}

export interface MediaPipeCamera {
  start: () => Promise<void>;
  stop: () => void;
}

type PoseConstructor = new (config: {
  locateFile: (file: string) => string;
}) => MediaPipePose;

type CameraConstructor = new (
  video: HTMLVideoElement,
  options: {
    onFrame: () => Promise<void>;
    width: number;
    height: number;
  },
) => MediaPipeCamera;

declare global {
  interface Window {
    Pose?: PoseConstructor;
    Camera?: CameraConstructor;
    POSE_CONNECTIONS?: unknown;
    drawConnectors?: (...args: unknown[]) => void;
    drawLandmarks?: (...args: unknown[]) => void;
  }
}

let mediaPipePromise: Promise<void> | null = null;

const loadScript = (src: string, ready: () => boolean) => {
  if (ready()) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    const handleLoad = () => {
      if (ready()) resolve();
      else reject(new Error(`MediaPipe loaded without its browser API: ${src}`));
    };

    if (existing) {
      existing.addEventListener("load", handleLoad, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Unable to load MediaPipe: ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.crossOrigin = "anonymous";
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error(`Unable to load MediaPipe: ${src}`)),
      { once: true },
    );
    document.head.appendChild(script);
  });
};

export const loadMediaPipe = () => {
  if (!mediaPipePromise) {
    mediaPipePromise = Promise.all([
      loadScript(
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${POSE_VERSION}/pose.js`,
        () => typeof window.Pose === "function",
      ),
      loadScript(
        `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@${CAMERA_VERSION}/camera_utils.js`,
        () => typeof window.Camera === "function",
      ),
      loadScript(
        `https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@${DRAWING_VERSION}/drawing_utils.js`,
        () =>
          typeof window.drawConnectors === "function" &&
          typeof window.drawLandmarks === "function",
      ),
    ]).then(() => undefined).catch((error) => {
      mediaPipePromise = null;
      throw error;
    });
  }

  return mediaPipePromise;
};

export const createPose = async (modelComplexity: number) => {
  await loadMediaPipe();

  if (!window.Pose) throw new Error("MediaPipe Pose is unavailable.");

  const pose = new window.Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${POSE_VERSION}/${file}`,
  });

  pose.setOptions({
    modelComplexity,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    selfieMode: false,
  });

  return pose;
};

export const createCamera = (
  video: HTMLVideoElement,
  onFrame: () => Promise<void>,
) => {
  if (!window.Camera) throw new Error("MediaPipe Camera is unavailable.");

  return new window.Camera(video, {
    onFrame,
    width: 720,
    height: 480,
  });
};
