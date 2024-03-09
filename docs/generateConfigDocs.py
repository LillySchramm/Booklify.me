import json5
import urllib.parse

config = {}
with open("../backend/config/default.json5", "r", encoding="UTF-8") as f:
    config = json5.load(f)

documentedConfig = {}
with open("../backend/config/.docs.json5", "r", encoding="UTF-8") as f:
    documentedConfig = json5.load(f)


def generateConfigDocs(config, documentedConfig, prefix=""):
    configDocs = {}
    for key in config:
        prefixedKey = prefix + key

        if prefixedKey in documentedConfig:
            configDocs[prefixedKey] = documentedConfig[prefixedKey]
        else:
            configDocs[prefixedKey] = {}

        configDocs[prefixedKey]["type"] = type(config[key]).__name__
        if configDocs[prefixedKey]["type"] == "str":
            configDocs[prefixedKey]["type"] = "string"
        elif configDocs[prefixedKey]["type"] == "int":
            configDocs[prefixedKey]["type"] = "integer"
        elif configDocs[prefixedKey]["type"] == "bool":
            configDocs[prefixedKey]["type"] = "boolean"
        elif configDocs[prefixedKey]["type"] == "dict":
            configDocs[prefixedKey]["type"] = "object"

        if "description" not in configDocs[prefixedKey]:
            configDocs[prefixedKey]["description"] = ""

        if "examples" not in configDocs[prefixedKey]:
            configDocs[prefixedKey]["examples"] = []

        if "default" not in configDocs[prefixedKey]:
            configDocs[prefixedKey]["default"] = None

        if isinstance(config[key], dict):
            configDocs |= generateConfigDocs(
                config[key], documentedConfig, prefixedKey + "."
            )
        else:
            configDocs[prefixedKey]["default"] = config[key]
    return configDocs


documentedConfig = generateConfigDocs(config, documentedConfig)
with open("../backend/config/.docs.json5", "w", encoding="UTF-8") as f:
    f.write(json5.dumps(documentedConfig, indent=4, sort_keys=True))

with open("../backend/config/.docs.json5", "r", encoding="UTF-8") as f:
    documentedConfig = json5.load(f)

template = ""
with open("docs/setup/_config.md", "r", encoding="UTF-8") as f:
    template = f.read()

content = ""
for key in documentedConfig:
    indent = key.count(".") + 2
    docContent = f"{'#' * indent} {key}\n"
    docContent += f"**Type:** `{documentedConfig[key]['type']}`\\\n"
    if (
        "default" in documentedConfig[key]
        and str(documentedConfig[key]["default"]) != "None"
        and str(documentedConfig[key]["default"])
    ):
        docContent += f"**Default:** `{json5.dumps(documentedConfig[key]['default'], indent=4)}`\\\n"
    if "description" in documentedConfig[key] and documentedConfig[key]["description"]:
        docContent += f"**Description:** {documentedConfig[key]['description']}\\\n"
    if "examples" in documentedConfig[key] and documentedConfig[key]["examples"]:
        docContent += f"**Examples:**\n"
        for example in documentedConfig[key]["examples"]:
            docContent += f"- `{json5.dumps(example, indent=4)}`\n"

    if docContent.endswith("\\\n"):
        docContent = docContent[:-2]
    content += docContent + "\n"
template = template.replace("{{content}}", content)

with open("docs/setup/config.md", "w", encoding="UTF-8") as f:
    f.write(template)
