import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_wrn_compute extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_wrn_compute',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_wrn_compute is activated!');
  }
};

export default extension;
