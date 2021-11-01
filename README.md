# Coinbase Tickers

## Requirements

The goal of the exercise is to receive market data from an exchange, build an order book of 10 levels (prices), and print the order book on each "tick".
For the purposes of this exercise, we only care about order book updates. The API in question is the Coinbase Pro API.

Once you have the data coming in, you'll want to process it, then build and maintain your order book of 10 levels (of bids and asks), and on each update, print out to the screen the bids and asks. There's no need to create an account / API key for connecting to the websocket.

Ideally you complete this exercise with React.js and state management offered by react (no state management libs). 

## Coinbase Pro API Reference: 

https://docs.pro.coinbase.com

https://docs.pro.coinbase.com/#the-level2-channel

### The level 2 channel

The easiest way to keep a snapshot of the order book is to use the level2 channel. It guarantees delivery of all updates, which reduce a lot of the overhead required when consuming the full channel.

```
{
    "type": "snapshot",
    "product_id": "BTC-USD",
    "bids": [["10101.10", "0.45054140"]],
    "asks": [["10102.55", "0.57753524"]]
}
```

When subscribing to the channel it will send a message with the type snapshot and the corresponding product_id. bids and asks are arrays of [price, size] tuples and represent the entire order book.

```
{
  "type": "l2update",
  "product_id": "BTC-USD",
  "time": "2019-08-14T20:42:27.265Z",
  "changes": [
    [
      "buy",
      "10101.80000000",
      "0.162567"
    ]
  ]
}
```

Subsequent updates will have the type l2update. The changes property of l2updates is an array with [side, price, size] tuples. The time property of l2update is the time of the event as recorded by our trading engine. Please note that size is the updated size at that price level, not a delta. A size of "0" indicates the price level can be removed.

## Challenges

- Implement state to store the snapshot
- Implement updates on the snapshot
- Optimize rendering for larger ticker counts
- Use profiling tools such as (React Profiler API and/or Chrome Performance Debugger Tool) to find bottlenecks
- Implement infinite scrolling
- Better reorganize project files
- Add tests for utility functions and / or components

## Example UI

![image001](https://user-images.githubusercontent.com/55159/139743694-61f20066-cbef-40f3-af6a-8fb15bcc7327.png)