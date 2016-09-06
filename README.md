# stock-analyzer

## Real-time stock data processing system.

## Architecture
![Image](https://github.com/brucexiejiaming/stock-analyzer/architecture.tiff?raw=true)


####Kafka
~~~~
python simple-data-producer.py AAPL stock-analyzer 192.168.99.101:9092
~~~~

####Cassandra
~~~~
python data-storage.py stock-analyzer 192.168.99.101:9092 stock stock 192.168.99.101
~~~~

####Spark
~~~~
spark-submit --jars spark-streaming-kafka-0-8-assembly_2.11-2.0.0.jar stream-processing.py stock-analyzer averagePrice 192.168.99.101:9092
~~~~

####Redis
~~~~
python redis-publisher.py averagePrice 192.168.99.101:9092 averagePrice 192.168.99.101 6379
~~~~

####Nodejs
~~~~
node index.js --redis_port 6379 --redis_host 192.168.99.101 --subscribe_topic averagePrice --port 3000
~~~~
