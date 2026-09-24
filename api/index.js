module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json({
        status: "online",
        message: "TrueMoney Voucher API",
        endpoints: {
            redeem: "POST /api/redeem"
        },
        documentation: "https://github.com/missyoubutdontcomeback/angpao"
    });
};
