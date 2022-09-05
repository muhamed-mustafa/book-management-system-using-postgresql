import events from 'events';
import { Audit } from '../model/audit.model.js';
import { queryList } from '../db/queries.js';
import { dbquery } from '../db/connection.js';

let emitter = new events.EventEmitter();

const auditEvent = 'audit';

let audit = new Audit();
emitter.on(auditEvent, async function (audit) {
  try {
    let values = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.error,
      audit.auditBy,
      audit.auditOn,
    ];

    let auditQuery = queryList.AUDIT_QUERY;
    await dbquery(auditQuery, values);
  } catch (err) {
    console.log('Audit Event Emitter - error : ' + err);
  }
});

let prepareAudit = function (
  auditAction,
  data,
  status,
  error,
  auditBy,
  auditOn
) {
  status = 200;
  if (error) status = 500;

  let auditObj = new Audit(auditAction, data, status, error, auditBy, auditOn);
  emitter.emit(auditEvent, auditObj);
};

export { prepareAudit };
