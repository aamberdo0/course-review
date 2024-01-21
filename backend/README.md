# Setting up Index
https://www.mongodb.com/docs/atlas/atlas-search/tutorial/create-index/#std-label-fts-tutorial-index-creation-atlas-cli

`mongosh "mongodb+srv://hackville.3ppwtkc.mongodb.net/" --apiVersion 1 --username mongotmu`

****
Install MongoDB Atlas CLI `brew install mongodb-atlas-cli`

Login to Atlas `atlas auth login`

Run `atlas projects list` and note down `id`

Create search index
```shell
atlas clusters search index create \
    --clusterName Hackville \
    --file index.json \
    --projectId 64563f8dc69edf2817bc6f41
```

`uvicorn main:app  --reload --host 0.0.0.0 --port 8000`

`docker buildx build --platform=linux/amd64 --output type=docker -t jamesliangg/<CONTAINER_NAME> .`