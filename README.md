## Hazelcast React client

This react client uses the hazelcast-client project to connect to a Hazelcast IMDG map.
After building this react client, the contents of the build folder are copied over to the hazelcast-client project. You can use the copytoquarkus.sh script in the root to do this if both projects are available in the same folder. The resulting static content of this project will then be served by the Quarkus runtime in the hazelcast-client project.

During development use :

```
yarn start
```

to start the local server.

To do a production build use :

```
yarn build
```

