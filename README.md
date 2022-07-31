# wifi-signal-monitor

#### Description

**wifi-signal-monitor** is a npm package to install a CLI tool to monitor wifi signal strength on your mac and post a message to a desired channel on slack when ever the RSSI value is less than -67 dBm.

## Prerequisites

- A slack app in your workspace and a incomming webhook setup to send a message to a desired channel.

## Installation

Install wifi-signal-monitor globally.

```sh
npm i -g wifi-signal-monitor
```

## supported commands

- --sleep : sleep time in ms (minimum value is 500).
- --webhook-url : webhook url of the incomming webhook to send a message on slack.

## Usage

Run the command "**monitor-signal-strength --sleep <sleep time in ms> --webhook-url <slack webhook url>**" in your mac terminal to start wifi monitoring.

```sh
monitor-signal-strength --sleep <sleep time in ms> --webhook-url <slack webhook url>
```

Note: Append "**&**" at the end of the command to run this in background.
