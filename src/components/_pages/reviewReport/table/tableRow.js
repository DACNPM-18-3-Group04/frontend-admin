import {
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  Chip,
} from '@mui/material';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MoreMenu from './moreMenu';

dayjs.extend(relativeTime);

export default function ListTableRow({
  row = {
    id: null,
    reason: '',
    status: '',
    review: {
      id: null,
      rating: null,
      review: '',
      status: '',
      contact: {
        id: null,
        user: {
          id: null,
          avatar: '',
          fullname: '',
        },
        property: {
          id: null,
          title: '',
          createdAt: '',
          user: {
            id: null,
            avatar: '',
            fullname: '',
          },
        },
      },
    },
  },
  selected = false,
  handleClick = () => {},
  onExecuteReport,
  onSkipReport,
}) {
  const { id, reason, review, status } = row;
  const { contact } = review;
  let { property, user: reviewer } = contact;

  if (!property) {
    property = {
      id: null,
      title: '(Không có thông tin)',
      createdAt: '',
      user: {
        id: null,
        avatar: '',
        fullname: '',
      },
    };
  }

  const { user: author } = property;

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role='checkbox'
      selected={selected}
      aria-checked={selected}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          checked={selected}
          onChange={(event) => handleClick(event, id)}
        />
      </TableCell>

      <TableCell align='left'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Tooltip title={reviewer.fullname}>
            <Avatar
              alt={reviewer.fullname}
              src={reviewer.avatar}
              sx={{ width: 36, height: 36, fontSize: '1rem' }}
            >
              {reviewer.fullname ? reviewer.fullname.charAt(0) : null}
            </Avatar>
          </Tooltip>

          <Stack direction='column'>
            <Box sx={{ color: '#2196f3' }}>
              {review.rating &&
                Array.from(Array(review.rating)).map((_, i) => (
                  <StarIcon key={i} fontSize='small' />
                ))}
            </Box>
            {review.review && (
              <Tooltip title={review.review}>
                <Typography fontSize='0.8rem' noWrap>
                  {review.review}
                </Typography>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='left'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar
            alt={author.fullname}
            src={author.avatar}
            sx={{ width: 36, height: 36, fontSize: '1rem' }}
          >
            {author.fullname ? author.fullname.charAt(0) : null}
          </Avatar>

          <Stack direction='column'>
            <Typography fontSize='0.8rem' noWrap>
              {author.fullname}
            </Typography>
            <Tooltip title={reason}>
              <Typography fontSize='0.8rem' noWrap>
                {reason}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='left'>
        {status === 'P' ? (
          <Chip label='Chờ' color='info' />
        ) : status === 'E' ? (
          <Chip label='Xử lý' color='success' />
        ) : (
          <Chip label='Bỏ qua' color='warning' />
        )}
      </TableCell>

      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Stack direction='column'>
            <Typography variant='caption' noWrap>
              {property.title}
            </Typography>
            {property.createdAt === '' ? (
              ''
            ) : (
              <Typography fontSize='0.8rem' noWrap>
                {dayjs(property.createdAt).fromNow()}
              </Typography>
            )}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='right'>
        <MoreMenu
          onExecuteReport={onExecuteReport}
          onSkipReport={onSkipReport}
        />
      </TableCell>
    </TableRow>
  );
}
