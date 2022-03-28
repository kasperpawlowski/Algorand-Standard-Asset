import React, {useContext, useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ClientContext from './ClientContext'
import AccountInformation from './AccountInformation'

export default function Explorer(props) {
    const client = useContext(ClientContext);
    const [address, setAddress] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        if(props.account) setAddress(props.account.addr);
    }, [props.account]);

    const fetchInformation = async event => {
        event.preventDefault();
        try {
            const info = await client.accountInformation(address).do();

            for(let i=0; i<info.assets.length; i++) {
                info.assets[i] = {
                    ...info.assets[i],
                    ...await client.getAssetByID(info.assets[i]['asset-id']).do()
                }
            }
            setData(info);
            console.log(info)
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <div className="w-50 m-auto mb-4">
            <h3 className="mt-4">Fetch information for a given address</h3>
            <Form className="w-75 m-auto" onSubmit={fetchInformation}>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Control
                        type="text"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Fetch information
                </Button>
            </Form>
            {data.address ? 
            <AccountInformation className="mt-4" data={data} /> :
            <></>}
        </div>
    )
}
