# Dog Breed Identification

A simple project to predict dog breeds.
This projects employed a deep learning model that has been trained to recognize dog breeds.
The model is served through REST API running on python backend.
A simple webapp is employed as user interface.

![Screenshot 01](https://github.com/arifoyong/dog-breed-identifier/blob/master/screenshots/Screenshot_01.gif)

[Demo](http://dogbreed.oyong.tk).
note: performance is slow as we are running on cheap web server with shared other applications

## Dataset

The model was trained with dataset obtained from [Kaggle](https://www.kaggle.com/c/dog-breed-identification).
This dataset comprises 120 breeds of dogs.

## How to use

Clone the repository to your local folder.
Type the following:

```
docker-compose up
```

Go to: http://localhost:3001/

By default, backend server is serving the API on http://localhost:8000
If the default is changed, we have to let the frontend know.
This can be done by creating .env file in /frontend and specifying API endpoint as follow:

```
API=new_API_endpoint
```

## Technology used

Machine Learning:

1. Pytorch
2. FastAI

Backend:

1. Python
2. FastAPI
3. Docker

Frontend

1. Next.js
2. Tailwindcss
3. Docker
