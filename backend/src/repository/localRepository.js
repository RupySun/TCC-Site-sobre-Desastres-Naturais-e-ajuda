import con from "./connection.js";

export async function inserirLocal(local) {
    const comando = `
        insert into local (nome_local, endereco, funcionamento, imagem)
        values (?, ?, ?, ?)
    `;

    let resposta = await con.query(comando, [local.nome, local.endereco, local.horario, local.imagem]);
    let info = resposta[0];

    return info.insertId;
}

export async function listarLocaisPendentes() {
    const comando = `
        select id_locate, nome_local, endereco, funcionamento, imagem
        from local
        where status = 'pendente'
    `;

    let registros = await con.query(comando);
    return registros[0];
}

export async function listarLocaisAprovados() {
    const comando = `
        select id_locate, nome_local, endereco, funcionamento, imagem
        from local
        where status = 'aprovado'
    `;

    let registros = await con.query(comando);
    return registros[0];
}

export async function aprovarLocal(id) {
    const comando = `
        update local
        set status = 'aprovado'
        where id_locate = ?
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows > 0;
}

export async function deletarLocal(id) {
    const comando = `
        delete from local
        where id_locate = ?
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows > 0;
}
