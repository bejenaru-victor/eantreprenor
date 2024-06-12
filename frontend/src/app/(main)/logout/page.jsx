
import SignOut from '@/components/utils/Signout';
import CircularProgress from '@mui/material/CircularProgress';

export default function Page() {    
    return <>
        <SignOut />
        <div style={{width: '100%', height: '100vh', display: 'flex'}}>
            <div style={{margin: 'auto', display: 'flex'}}>
                <div style={{marginTop: 'auto', marginBottom: 'auto', marginRight: '1.5rem'}}>
                    <CircularProgress />
                </div>
                <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <h2 style={{fontWeight: '300'}}>Logging out</h2>
                </div>
            </div>
        </div>
    </>
}