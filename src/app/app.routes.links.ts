import {appRoutesNames} from '@app/app.routes.names';
import {listViewRoutesNames} from '@features/list-view/list-view.routes.names';
import {sandGravelExtractionRoutesNames} from '@features/sand-gravel-extraction-form/sand-gravel-extraction-form.routes.names';

export const appRoutesLinks = {
  SANDGRAVELEXTRACTIONFORM_CREATE: [`/`],
  SANDGRAVELEXTRACTIONFORM_READ: [`/${appRoutesNames.SANDGRAVELEXTRACTIONFORM}/${sandGravelExtractionRoutesNames.READ}`],
  LISTVIEW: [`/${appRoutesNames.LISTVIEW}`],
  LISTVIEW_CAPTAIN: [`/${appRoutesNames.LISTVIEW}/${listViewRoutesNames.CAPTAIN}`],
  LISTVIEW_CONCESSION: [`/${appRoutesNames.LISTVIEW}/${listViewRoutesNames.CONCESSION}`],
  LOGIN: [`/${appRoutesNames.LOGIN}`],
  ERROR: [`/${appRoutesNames.ERROR}`]
};
