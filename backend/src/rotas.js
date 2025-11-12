import usuarioController from './controller/usuarioController.js'
import localController from './controller/localController.js'
import relatarController from './controller/relatarController.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuarioController);
    servidor.use(localController);
    servidor.use(relatarController);
}
