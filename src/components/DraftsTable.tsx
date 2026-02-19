import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectDrafts,
  setActiveDraft,
  deleteDraft,
} from '../store/serviceLog'

const DraftsTable = () => {
  const drafts = useAppSelector(selectDrafts)
  const dispatch = useAppDispatch()

  if (!drafts.length) {
    return <Typography>No drafts available</Typography>
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Provider</TableCell>
          <TableCell>Order</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {drafts.map((draft) => (
          <TableRow key={draft.id}>
            <TableCell>{draft.providerId}</TableCell>
            <TableCell>{draft.serviceOrder}</TableCell>
            <TableCell>{draft.type}</TableCell>
            <TableCell>
              <Button
                size="small"
                onClick={() => dispatch(setActiveDraft(draft.id))}
              >
                Resume
              </Button>

              <IconButton
                onClick={() => dispatch(deleteDraft(draft.id))}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DraftsTable
