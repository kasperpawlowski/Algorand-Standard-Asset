import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ClientContext from './ClientContext'
import algosdk from 'algosdk'

export default function Creator(props) {
    const client = useContext(ClientContext);
    const clearForm = {name: '', symbol: '', amount: ''};
    const [form, setForm] = useState(clearForm);
    const [balance, setBalance] = useState(0);
    const [success, setSuccess] = useState(false);
    let timer = null;

    useEffect(() => {
        if(!props.account) return;

        if(!timer) {
            timer = setInterval(async () => {
                const accountInfo = await client.accountInformation(props.account.addr).do();
                if(accountInfo.amount > 0) {
                    setBalance(accountInfo.amount);
                    clearInterval(timer);
                    timer = null;
                }
            }, 1000);
        }

        return () => {
            if(timer) clearInterval(timer);
        };
    }, [props.account, balance]);

    const setField = (field, value) => {
        setForm(form => ({...form, [field]: value}));
        setSuccess(false);
    }

    const createASA = async event => {
        event.preventDefault();
        const params = await client.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;
        const asset = {
            from: props.account.addr,
            assetName: form.name,
            unitName: form.symbol,
            total: parseInt(form.amount),
            decimals: 6,
            defaultFrozen: false,
            suggestedParams: params
        }

        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(asset);
        const rawSignedTxn = txn.signTxn(props.account.sk);
        const tx = await client.sendRawTransaction(rawSignedTxn).do();
        const ptx = await algosdk.waitForConfirmation(client, tx.txId, 4);

        if(ptx['pool-error'] === '') {
            setSuccess(true);
            setForm(clearForm);
        }
    }

    return (
        <div className="w-50 m-auto mt-4">
            {!props.account ?
            <div>
                <h3>Create Algorand paper wallet</h3>
                <Button variant="success" className="mt-2" onClick={props.createWallet}>
                    Create Wallet
                </Button> 
            </div> :
            <div>
                <h3>Wallet successfully created</h3>
                <h4>Your address:</h4>
                <p>{props.account.addr}</p>
                <h4>Your mnemonic:</h4>
                <p>{algosdk.secretKeyToMnemonic(props.account.sk)}</p>

                {balance <= 0 ? 
                <h3>{"Go to the "} 
                    <a href="https://bank.testnet.algorand.network/" target="_blank">faucet</a>
                    {" to fund the account"}
                </h3> :
                <div>
                    <h3 className="mt-4">Create Algorand Standard Asset</h3>
                    <Form className="w-25 m-auto" onSubmit={createASA}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Asset Name</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setField('name', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="symbol">
                            <Form.Label>Asset Symbol</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={form.symbol}
                                onChange={e => setField('symbol', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control 
                                type="number" 
                                required
                                value={form.amount}
                                onChange={e => setField('amount', e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Create ASA
                        </Button> 
                    </Form>
                    {success ? 
                    <div>
                        <h3 className="mt-4">{`Success!\nGo to the `}
                        <Link to="/explore">explorer</Link>
                        </h3>
                    </div> :
                    <></>}
                </div>}
            </div>
            }
        </div>
    )
}
