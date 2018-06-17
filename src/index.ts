import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { Toolbar, ToolbarButton } from '@jupyterlab/apputils';
import { TabBar, PanelLayout, Widget } from '@phosphor/widgets';


import '../style/index.css';


const TOOLBAR_CLASS = 'wrn-Compute-toolbar';

// namespace CommandIDs {
//   export
//   const open: string = 'vm-warren:create';
// }

class ComputeWidget extends Widget {
  /**
   * Construct a new FaaS widget.
   */
  constructor() {
      super();
      // this.settings = ServerConnection.makeSettings();

      this.id = 'wrn-compute-jupyterlab';
      this.title.label = 'Compute';
      this.title.closable = true;
      this.addClass('jp-computeWidget');
      this.node.innerHTML = '<div tabindex="1" class="p-Widget jp-DirListing jp-FileBrowser-listing jp-mod-selected"><div class="jp-DirListing-header"><div class="jp-DirListing-headerItem jp-id-name jp-mod-selected"><span class="jp-DirListing-headerItemText">Name</span><span class="jp-DirListing-headerItemIcon"></span></div><div class="jp-DirListing-headerItem jp-id-modified"><span class="jp-DirListing-headerItemText">Last Modified</span><span class="jp-DirListing-headerItemIcon"></span></div></div>'


      let url = 'https://app.pilw.io:8443/v1/user-resource/vm/list';

      getRequest(url).then(response => {
        let vms = JSON.parse(response);
        for (let vm of vms ) {
          let vmnode = document.createElement('div');
          vmnode.innerHTML = '<b>' + vm.name + '</b>';
          this.node.appendChild(vmnode);
          console.log(vm.name);
        }
      })
      .catch(error => {
        console.log(error);
      });

      this.toolbar = new Toolbar<Widget>();
      // Add a launcher toolbar item.
      let createBtn = new ToolbarButton({
        className: 'jp-AddIcon',
        onClick: () => {
          // return createLauncher(commands, widget);
          // app.shell.addToMainArea(widget);
          // console.log(this);
        }
      });
      createBtn.addClass('jp-MaterialIcon');
      // this.toolbar.addItem('spacer', Toolbar.createSpacerItem());
      this.toolbar.addItem('launcher', createBtn);
      this.toolbar.addClass(TOOLBAR_CLASS);


      // fetch('https://app.pilw.io:8443/v1/user-resource/vm/list').then(response => {
      //   return response.json();
      // }).then(data => {
      //   console.log(data);

      //   // this.div.src = data.;
      //   // this.div.alt = data.;
      //   // this.div.title = data.;
      // });


      let layout = new PanelLayout();
      layout.addWidget(this.toolbar);
      this.layout = layout;

    }

  readonly toolbar: Toolbar<Widget>;

  readonly img: HTMLImageElement;

  readonly section: HTMLFieldSetElement;

  readonly warren: Boolean = true;

  }

function getRequest(url: string): Promise<any> {
  return new Promise<any>(
    function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error('XMLHttpRequest Error: ' + request.statusText));
      };
      request.open('GET', url);
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.setRequestHeader('apikey', 'hhT4tTTYLHb5Bp9ef7DpZRSm9o9pC3lu');
      request.send();
    });
  }


/**
 * Initialization data for the jupyterlab_wrn_compute extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_wrn_compute',
  autoStart: true,

  activate: (app: JupyterLab) => {
    // console.log('Activating jupyterlab_wrn_compute.');

    const { shell } = app;
    const tabs = new TabBar<Widget>({ orientation: 'vertical' });
    tabs.id = 'tab-manager';
    tabs.title.label = 'Compute';

    let widget = new ComputeWidget();
    shell.addToLeftArea(widget, { rank: 100 });

  }
};

export default extension;
