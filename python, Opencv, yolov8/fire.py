# from ultralytics import YOLO

# model = YOLO("D:/8th semester FYP/yolo2/PPE_FIRE_FALL.pt")
# results = model.predict(source="D:/8th semester FYP/yolo2/fireVideos/fire", imgsz=640, conf=0.4, save=True)

from ultralytics import YOLO

model = YOLO("D:/8th semester FYP/yolo2/PPE_FIRE_FALL.pt")
results = model.predict(source="D:/8th semester FYP/yolo2/fireVideos/hexpo.mp4", imgsz=640, conf=0.4, save=True)
