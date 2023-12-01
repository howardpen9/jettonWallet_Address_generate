contract AA {
    walletCode: Cell;
    MinterAddress: Address;

    init(_walletCode: Cell, MinterAddress: Address) {
        self.walletCode = _walletCode;
        self.MinterAddress = MinterAddress;
    }

    fun getJettonWallet(owner: Address): StateInit {
        let data: Cell = beginCell()
                            .storeCoins(0)                            
                            .storeAddress(owner)
                            .storeAddress(self.MinterAddress)
                            .storeRef(self.walletCode)
                            .storeCoins(0)
                            .storeUint(0, 48)
                        .endCell();

        let itemInit: StateInit = StateInit { data: data, code: self.walletCode }; 
        return itemInit;
    }

    get fun get_WalletAddress(to: Address): Address {
        return contractAddress(self.getJettonWallet(to));
    }

    get fun get_wallet_code(): Cell {
        return self.walletCode;
    }

    receive("C") {
        self.forward(self.get_WalletAddress(sender()), "Yes".asComment(), false, null);
    }
}