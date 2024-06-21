import { useContext } from 'react';
import { UXContext } from '@/components/inc/context'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ModelMessage() {

    const {uiData, setUiData} = useContext(UXContext)

    const closeSnackbar = () => {
        let data = {...uiData}
        data.message.open = false
        setUiData(data)
    }

    return <>
        <Snackbar open={uiData.message.open} autoHideDuration={6000}
            onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                {uiData.message.text}
            </Alert>
        </Snackbar>
    </>
}