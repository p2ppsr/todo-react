import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AppBar, Toolbar, List, ListItem, ListItemText, ListItemIcon, Checkbox, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, TextField,
  Button, Fab, LinearProgress
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import parapet from 'parapet-js'
import pushdrop from 'pushdrop'
import { getPublicKey, decrypt, encrypt, createAction } from '@babbage/sdk'

// Determine which Bridgeport environment this app is running in
const bridgeportResolvers = window.location.host.startsWith('localhost')
  ? ['http://localhost:3103']
  : window.location.host.startsWith('staging')
    ? ['https://staging-bridgeport.babbage.systems']
    : undefined // In production, Parapet defaults to the correct resolvers

const TODO_PROTO_ADDR = '1ToDoDtKreEzbHYKFjmoBuduFmSXXUGZG'

const useStyles = makeStyles({
  app_bar_placeholder: {
    height: '4em'
  },
  add_fab: {
    position: 'fixed',
    right: '1em',
    bottom: '1em'
  },
  loading_bar: {
    margin: '1em'
  }
}, { name: 'App' })

const App = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const [createTask, setCreateTask] = useState('')
  const [createAmount, setCreateAmount] = useState(1000)
  const [createLoading, setCreateLoading] = useState(false)
  const [tasksLoading, setTasksLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [completeOpen, setCompleteOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [completeLoading, setCompleteLoading] = useState(false)
  const classes = useStyles()

  // Loads a user's existing ToDo tokens from the bridge when the page loads
  useEffect(() => {
    (async () => {
      try {
        // Finds the current user's ToDo List protocol public key
        const userPublicKey = await getPublicKey({
          protocolID: 'todo list',
          keyID: '1'
        })

        const tasksFromBridge = await parapet({
          resolvers: bridgeportResolvers,
          bridge: TODO_PROTO_ADDR,
          request: {
            type: 'json-query',
            query: {
              v: 3,
              q: {
                collection: 'todo',
                find: {
                  user: userPublicKey
                }
              }
            }
          }
        })

        // Decrypt the tasks from the bridge
        const decryptedTasks = await Promise
          .all(tasksFromBridge.map(async task => {
            try {
              debugger
              const decryptedTask = await decrypt({
                ciphertext: task.task,
                protocolID: 'todo list',
                keyID: '1'
              })
              return {
                ...task,
                task: decryptedTask
              }
            } catch (e) {
              console.error('Error decrypting task:', e)
              return {
                ...task,
                task: '[error] Unable to decrypt task!'
              }
            }
          }))
        
        // We reverse the list, so the newest tasks are at the top
        setTasks(decryptedTasks.reverse())
      } catch (e) {
        toast.error(`Failed to load ToDo tasks! Does the app have permission? Error: ${e.message}`)
        console.error(e)
      } finally {
        setTasksLoading(false)
      }
    })()
  }, [])

  // Creates a new ToDo token
  const handleCreateSubmit = async e => {
    e.preventDefault()
    try {
      if (!createTask) {
        toast.error('Enter a task to complete!')
        return
      }
      if (!createAmount) {
        toast.error('Enter an amount for the new task!')
        return
      }
      if (Number(createAmount) < 200) {
        toast.error('The amount must be more than 200 satoshis!')
        return
      }
      setCreateLoading(true)
      const encryptedTask = await encrypt({
        plaintext: createTask,
        protocolID: 'todo list',
        keyID: '1'
      })
      // Create an action script based on the TODO protocol
      const actionScript = await pushdrop.create({
        fields: [
          Buffer.from(TODO_PROTO_ADDR, 'utf8'),
          Buffer.from(encryptedTask, 'base64')
        ],
        protocolID: 'todo list',
        keyID: '1'
      })
      // Create a new ToDo Token and add it to the list
      const newToDoToken = await createAction({
        outputs: [{
          satoshis: Number(createAmount),
          script: actionScript
        }],
        description: `Create a TODO task: ${createTask}`,
        bridges: [TODO_PROTO_ADDR]
      })
      toast.dark('Task successfully created!')
      setTasks(originalTasks => ([
        {
          task: createTask,
          amount: `${Number(createAmount)} satoshis`,
          token: newToDoToken
        },
        ...originalTasks
      ]))
      setCreateTask('')
      setCreateAmount(1000)
      setCreateOpen(false)
    } catch (e) {
      toast.error(e.message)
      console.error(e)
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <AppBar>
        <Toolbar>
          TODO
        </Toolbar>
      </AppBar>
      <div className={classes.app_bar_placeholder} />
      <div className={classes.add_fab}>
        <Fab color='secondary' onClick={() => setCreateOpen(true)}>
          <AddIcon />
        </Fab>
      </div>
      <List>
        {tasks.map((x, i) => (
          <ListItem key={i} button>
            <ListItemIcon><Checkbox checked={false} /></ListItemIcon>
            <ListItemText
              primary={x.task}
              secondary={x.amount}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit}>
          <DialogTitle>
            Create a Task
          </DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              Describe your task and set aside some satoshis you'll get back once
              it's done.
            </DialogContentText>
            <TextField
              multiline rows={3} fullWidth autoFocus
              label='Task to complete'
              onChange={e => setCreateTask(e.target.value)}
              value={createTask}
            />
            <br />
            <br />
            <TextField
              fullWidth type='number' min={100}
              label='Completion amount'
              onChange={e => setCreateAmount(e.target.value)}
              value={createAmount}
            />
          </DialogContent>
          {createLoading
            ? <LinearProgress className={classes.loading_bar} />
            : (
            <DialogActions>
              <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type='submit'>OK</Button>
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  )
}

export default App
