How to:

1. `npm start`

2. `curl -X POST http://localhost:8080/api/v1/myType` 

You will see something like:

```
Error: Api contains errors.
```

3. Comment osprey middleware line. Restart app.
4. `curl -X POST http://localhost:8080/api/v1/myType` 

You will see `You win`