import con from "./connection.js";

export async function inserirRelatar(relatar) {
    const comando = `
        insert into relatar (relatar_desastre, nivel_perigo, cidade_ocorrido)
        values (?, ?, ?)
    `;

    let resposta = await con.query(comando, [relatar.desastre, relatar.nivel, relatar.cidade]);
    let info = resposta[0];

    return info.insertId;
}

export async function listarRelatar() {
    const comando = `
        select id_relatardesastre, relatar_desastre, nivel_perigo, cidade_ocorrido
        from relatar
    `;

    let registros = await con.query(comando);
    return registros[0];
}

export async function obterDadosAgregados() {
    const comando = `
        select
            relatar_desastre as desastre,
            cidade_ocorrido as cidade,
            count(*) as ocorrencias,
            avg(nivel_perigo) as media_perigo
        from relatar
        group by relatar_desastre, cidade_ocorrido
        order by relatar_desastre, cidade_ocorrido
    `;

    let registros = await con.query(comando);
    return registros[0];
}

export async function deletarRelatar(id) {
    const comando = `
        delete from relatar where id_relatardesastre = ?
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
