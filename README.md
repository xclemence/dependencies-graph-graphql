# Dependencies Graph GraphQL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)
[![Build][github-actions-badge]][github-actions]
[![Quality Gate Status][sonar-project-badge]][sonar-project]

Dependencies Graph GraphQL provides GraphQL entry point retrieve assemblies and these dependencies. behind service, a [Neo4j][neo4j-url] database ensures graph storage.

## Features

* Get assemblies information
* Get software information

# How to use

## Build sources
- `yarn dev` for development. Navigate to `http://localhost:4001/graphql`. The app will automatically reload if you change any of the source files.
- `ng build` to build the project.

> *This project is configured to work with the [Remote Development][remote-development-plugin-url] plugin.*

With your server still running, visit `http://localhost:4001` in your browser to open GraphQL Playground (provide by **Apollo Server**)

<img src="doc/images/graphql-playground.png"/>

## Docker image

A Docker image with this software is available from the [packages][github-package] page.

This image is base on **Linux**. 

You can configure container by setting environment variables.

| Environment variable     |          Comment           |   sample value     |
|------------------------- | :--------------------------|-------------------- |
| NEO4J_HOST               | Noe4j database uri         | bolt://localhost    |
| GRAPH_SECURITY_ENABLED   | Enable jwt validation      | bolt://localhost    |
| GRAPH_TOKEN_ROLES_PATH   | Roles path inside jwt        | resource_access.graph-graphql.roles    |
| GRAPH_TOKEN_AUTHORITY    | Authority for token validation | http://localhost:9080/auth/realms/dependencies    |
| DEBUG                    | Activate @neo4j/graphql traces | @neo4j/graphql:*    |

Port exposed by Container:

|        Name        |       Description                |
| -------------------|--------------------------------- |
| 4001               | HTTP port for GraphQL services   |

You can start a Dependencies Graph Viewer container like this:

```
docker run \
    --publish=4001:4001 \
    dependencies-graph-graphql:tag
```

[github-actions]:                   https://github.com/xclemence/Dependencies-graph-graphql/actions
[github-actions-badge]:             https://github.com/xclemence/dependencies-graph-graphql/workflows/Node.js%20CI/badge.svg?branch=master

[sonar-project]:                    https://sonarcloud.io/dashboard?id=xclemence_dependencies-graph-graphql
[sonar-project-badge]:              https://sonarcloud.io/api/project_badges/measure?project=xclemence_dependencies-graph-graphql&metric=alert_status

[neo4j-url]:                        https://neo4j.com/
[remote-development-plugin-url]:    https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack 

[github-package]:                   https://github.com/xclemence/dependencies-graph-services/packages
