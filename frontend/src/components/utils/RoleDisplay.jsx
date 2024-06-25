import Chip from '@mui/material/Chip';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FaceIcon from '@mui/icons-material/Face';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

export default function RoleDisplay({role, children}) {
    const data = {
        'admin': {icon: <AdminPanelSettingsIcon />, color: 'primary',},
        'profesor': {icon: <EscalatorWarningIcon />, color: 'warning',},
        'elev': {icon: <FaceIcon />, color: 'success',},
        'inactiv': {icon: <RemoveCircleIcon />, color: 'default',},
    }
    return <Chip icon={data[role].icon} color={data[role].color} variant="outlined" label={children} />
}