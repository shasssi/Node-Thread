`EventLoop - helps node to execute code concurrently`
`Examples of I/O activities include reading/writing data from/to disk, performing HTTP requests, and interacting with databases. These activities are slower compared to accessing RAM or performing computations on the CPU.`
| Method | Worker Thread | Clusters |
|:-----|:--------:|------:|
| Granularity | Worker threads operate at thread level, providing a way to run JavaScript code in parallel within a single process. | Clusters operate at process level, allowing you to create multiple Node.js processes (workers) to handle incoming network requests. |
| Communication | Communication between worker threads is typically achieved through message passing using the postMessage API. | Communication between the master process and worker processes is achieved using IPC mechanisms. |
| I/O Operations | Worker threads are not built for I/O-intensive operations, as Node.js’s built-in asynchronous I/O mechanisms are often more efficient. | Clusters are built for handle I/O-intensive operations efficiently. Each worker in a cluster can handle incoming requests independently. |
| Memory Sharing | Worker threads can share memory using ArrayBuffer or SharedArrayBuffer instances, which allows more direct communication and shared data. | Clusters operate in separate processes so memory is isolated between them. Communication between clusters is often achieved through message passing. |
| Use Case | Worker threads are good for CPU-intensive tasks where parallel processing can significantly improve performance. | Clusters are good for improving the scalability of networked applications by distributing incoming requests among multiple processes. |
![alt text](<Single Process.jpeg>)
