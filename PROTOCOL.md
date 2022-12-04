# ToDo Protocol
Create and complete TODO items, with a reward.

## Goals
* Allow a user to create TODO tasks
* Allow a user to attach money to the task at time of creation
* Allow a user to mark the task as completed
* Allow a user to receive back their money once the task is completed
* Keep TODO items private with encryption

## Protocol
Creating a Bitcoin output script that complies with this protocol gives the elements of that script the following meanings:

Script Element | Meaning
---------------|--------------------
0	             | `<pubkey>`
1	             | `OP_CHECKSIG`
2	             | TODO Protocol ID (`1ToDoDtKreEzbHYKFjmoBuduFmSXXUGZG`)
3	             | Encrypted task data
4	             | A valid ECDSA signature from the field 0 public key over fields 2-3
…              |	`OP_DROP` / `OP_2DROP` — Drop fields 2-4 from the stack
