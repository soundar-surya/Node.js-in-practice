import sys
import json

def random():
    return 'random'

send_message_back = {
  'arguments': sys.argv[1:],
  'message': """Hello,
This is my message.

To the world""",
'rand': random()
}

print(json.dumps(send_message_back))