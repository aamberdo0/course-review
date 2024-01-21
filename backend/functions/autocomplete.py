# https://www.mongodb.com/docs/atlas/atlas-search/compound/#std-label-compound-ref
import pymongo
import dotenv
import os

dotenv.load_dotenv()


def query_complete(query, location):
    client = pymongo.MongoClient(os.environ["MONGO_URI"])

    index = "course_index"
    collectionName = "courses"
    database = "university"
    pipeline = [
        {
            '$search': {
                "index": index,
                'compound': {
                    'should': [
                        {
                            "autocomplete": {"query": query, "path": "course_title",
                                             "fuzzy": {"maxEdits": 1, "prefixLength": 1,
                                                       "maxExpansions": 256}}
                        }, {
                            "autocomplete": {"query": query, "path": "course_code",
                                             "fuzzy": {"maxEdits": 1, "prefixLength": 1,
                                                       "maxExpansions": 256}}
                        }
                    ],
                    'minimumShouldMatch': 1,
                }
            }
        },
        {"$limit": 10},
    ]
    result = list(client[database][collectionName].aggregate(pipeline))
    for i in result:
        i.pop('_id', None)
    client.close()
    return result


if __name__ == "__main__":
    query_complete("Economics", "York University")
