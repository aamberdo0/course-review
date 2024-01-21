# Backend
## Folder Structure
```yaml
.
├── examples                    # Example JSONs to load into MongoDB
│   ├── example_course_1.json
│   ├── example_course_2.json
│   ├── example_course_3.json
│   └── example_course_4.json
├── examples
│   ├── autocomplete.py         # Autocompleting text field function
│   └── database.py             # All other MongoDB functions
├── .dockerignore               # Ignores .env and venv folder
├── Dockerfile                  # Instructions to build Docker container
├── index.json                  # Search index for MongoDB
├── main.py                     # FastAPI server
├── README.md                  
└── requirements.txt            # All dependencies       

```
## Setting Up Search Index
https://www.mongodb.com/docs/atlas/atlas-search/tutorial/create-index/#std-label-fts-tutorial-index-creation-atlas-cli
****
Install MongoDB Atlas CLI `brew install mongodb-atlas-cli`

Login to Atlas `atlas auth login`

Run `atlas projects list` and note down `id`

Create search index
```shell
atlas clusters search index create \
    --clusterName <CLUSTER_NAME> \
    --file index.json \
    --projectId <PROJECT_ID>
```
## Running the server
Create a `.env` file with the MongoDB connection string inside.
```markdown
MONGO_URI=<MONGO_URI>
```
### Docker
Run `docker run -p 8000:8000 --env-file ./.env --platform linux/amd64 -d jamesliangg/<CONTAINER_NAME>:<VERSION>` in the folder with the `.env` file.
### Localhost
Run `pip install -r requirements.txt` in this folder.

Run `uvicorn main:app  --reload --host 0.0.0.0 --port 8000` to start the server. The endpoint is now [http://127.0.0.1:8000](http://127.0.0.1:8000).
## Building Docker Container
On ARM Macs, run `docker buildx build --platform=linux/amd64 --output type=docker -t jamesliangg/<CONTAINER_NAME> .`

To push to Docker Hub, run `docker push jamesliangg/<CONTAINER_NAME>`
