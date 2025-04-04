const User = require("../model/User");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email já está em uso" });
    }

    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: "Parâmetros de paginação inválidos",
      });
    }

    const result = await User.findAll(page, limit);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    console.error("Error listing users: ", err);
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.json({ success: true, data: user });
  } catch (err) {
    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({ success: false, message: err.message });
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    await User.findById(id);

    const updatedUser = await User.update(id, { username, email, role });

    res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      data: updatedUser,
    });
  } catch (err) {
    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({
        sucess: false,
        message: err.message,
      });
    }
    next(err);
  }
};

exports.updatedUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "A nova senha deve ter pelo menos 8 caracteres",
      });
    }

    const success = await User.updatedPassword(id, newPassword);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    res.json({
      success: true,
      message: "Senha atualizada com sucesso",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findById(id);

    const success = await User.delete(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }
    res.json({
      success: true,
      message: "Usuário deletado com sucesso",
    });
  } catch (err) {
    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};
