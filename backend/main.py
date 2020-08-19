from typing import Optional
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from class_names import CLASS_NAMES
import aiofiles
from fastai.vision import *

app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/api')
def read_api():
  return {"message": "Hello World"}

@app.get('/class')
def read_api():
  return {"class": CLASS_NAMES}

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
  dogBreedModel = load_learner(path='models', file='model_resnet50_08909.pkl')

  tempFile = 'tmp/image.jpg'
  img = await file.read()

  print("receive file:", file.filename)
  async with aiofiles.open(f"{tempFile}", "wb") as f:
    await f.write(img)

  imgToPredict = open_image(tempFile)
  pred_class, pred_idx, outputs = dogBreedModel.predict(imgToPredict)
  pred_id = pred_idx.numpy().item()
  conf_lvl = float(outputs.numpy().max())

  sortedOutputs = np.argsort(outputs.numpy())
  top10Outputs = sortedOutputs[::-1][:10]
  top10  = [{CLASS_NAMES[i]: outputs[i].numpy().item()} for i in top10Outputs]


  resp = {'prediction': CLASS_NAMES[pred_id],
          "probability": conf_lvl,
          'prediction2': CLASS_NAMES[top10Outputs[1]],
          "probability2": outputs[top10Outputs[1]].numpy().item(),
          'prediction3': CLASS_NAMES[top10Outputs[2]],
          "probability4": outputs[top10Outputs[2]].numpy().item(),
          "top10": top10}

  return resp
