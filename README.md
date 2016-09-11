# stock-analyzer

## Real-time stock data processing system.
![Image](https://github.com/brucexiejiaming/stock-analyzer/blob/master/demo.gif?raw=true)

## Architecture
![Image](https://github.com/brucexiejiaming/stock-analyzer/blob/master/architecture.jpg?raw=true)



Check the ip for the "bigdata" VM: 
~~~~
docker-machine ip bigdata
~~~~

Assume that the ip is 192.168.99.100.
Use the following command lines to set up different parts:

####Kafka
~~~~
python simple-data-producer.py AAPL stock-analyzer 192.168.99.100:9092
~~~~

####Cassandra
~~~~
python data-storage.py stock-analyzer 192.168.99.100:9092 stock stock 192.168.99.100
~~~~

####Spark
~~~~
spark-submit --jars spark-streaming-kafka-0-8-assembly_2.11-2.0.0.jar stream-processing.py stock-analyzer averagePrice 192.168.99.100:9092
~~~~

####Redis
~~~~
python redis-publisher.py averagePrice 192.168.99.100:9092 averagePrice 192.168.99.100 6379
~~~~

####Nodejs
~~~~
node index.js --redis_port 6379 --redis_host 192.168.99.100 --subscribe_topic averagePrice --port 3000
~~~~
