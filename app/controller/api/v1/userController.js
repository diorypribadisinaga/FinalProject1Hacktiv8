const {
    user
} = require("../model");

module.exports = {
    async tampil(req, res, next) {
        try {
            await user.findAll().then(result => {
                if (result.length > 0) {
                    return res.status(200).json({
                        success: 1,
                        data: result
                    });
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: "tidak ditemukan...",
                    });
                }
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            });
        }
    },
    async register(req, res, next) {
        try {
            const {
               username,
               password,
            } = req.body;
            await user.create({
                username,
                password,
            }).then(result => {
                return res.status(201).json({
                    success: 1,
                    message: 'Berhasil Daftar',
                    data: result,
                });
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            })
        }
    },
    async login(req, res, next) {
        try {
            const {
                username,
               password,
            } = req.body;
            await user.update({
                username,
                password,
            }, {
                where: {
                    id_user: req.params.id_user
                }
            }).then(result => {
                if (result == 1) {
                    return res.status(201).json({
                        success: 1,
                        message: 'Berhasil login',
                    })
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: 'Tidak ada perbaruan data',
                    })
                }
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            })
        }
    }
}