contract AA {
    walletCode: Cell;
    MinterAddress: Address;
    itemCode: Cell;
    CollectionAddress: Address;

    init(_walletCode: Cell, MinterAddress: Address, _itemCode: Cell, CollectionAddress: Address) {
        self.walletCode = _walletCode;
        self.MinterAddress = MinterAddress;
        self.itemCode = _itemCode;
        self.CollectionAddress = CollectionAddress; 
    }

    fun getJettonWallet(owner: Address): StateInit {
        // https://github.com/EmelyanenkoK/jetton_dao/blob/02fed5d124effd57ea50be77044b209ad800a621/contracts/jetton-utils.func#L5
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
    // ========================================================================================================
    fun getNFTItemAddress(item_index: Int): StateInit {
        let data: Cell = beginCell()
                            .storeUint(item_index, 256)
                            .storeSlice(self.CollectionAddress.asSlice())
                            .storeRef(beginCell().endCell())
                        .endCell();
        let itemInit: StateInit = StateInit {
            data: data,
            code: self.itemCode
        }; 
        return itemInit;
    }

    get fun get_NFTItemAddressByIndex(item_index: Int): Address {
        return contractAddress(self.getNFTItemAddress(item_index));
    }
    // ========================================================================================================

    receive("C") {
        self.forward(self.get_WalletAddress(sender()), "Yes".asComment(), false, null);
    }
}