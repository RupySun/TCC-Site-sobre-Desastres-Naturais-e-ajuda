import con from "./connection.js";
import crypto from "crypto-js";

export async function inserirUsuario(pessoa) {
    const comando = `
        insert into tb_usuario (usuario, senha) 
					        values (?, ?)
    `;

    let hash = crypto.SHA256(pessoa.senha).toString();
    
    let resposta = await con.query(comando, [pessoa.usuario, hash])
    let info = resposta[0];
    
    return info.insertId;
}

export async function validarUsuario(pessoa) {
    const comando = `
        select 
            id,
            usuario
        from tb_usuario 
        where 
            usuario = ?
            and senha = ?
    `;
    
    let hash = crypto.SHA256(pessoa.senha).toString();

    let registros = await con.query(comando, [pessoa.usuario, hash])
    return registros[0][0];
}