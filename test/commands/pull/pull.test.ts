import {expect, test} from '@oclif/test'
import {
  biStreamingService,
  biStreamingServiceWsdl,
  biStreamingServiceXsd0,
  biStreamingServiceXsd1,
  biStreamingServiceXsd2,
} from '../../payloads/biStreamingServiceWsdl'
import {
  executeReportRequest,
  executeReportResponseSuccess,
  getReportParametersRequest,
  getReportParametersResponseSuccessNoParams,
  logOffRequest,
  logOffResponseSuccess,
  logOnRequest,
  logOnResponseSuccess,
} from '../../payloads/biDataService'
import {
  biDataServiceWsdl,
  biDataServiceWsdl0,
  biDataServiceXsd0,
  biDataServiceXsd1,
  biDataServiceXsd2,
  biDataServiceXsd3,
  biDataServiceXsd4,
} from '../../payloads/biDataServiceWsdl'
import {
  biStreamingServiceRequest,
  biStreamingServiceResponseCompleted,
} from '../../payloads/biStreamingService'

describe('pull', () => {
  test
  // Initial request to get the WSDL
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService').reply(200, biDataServiceWsdl),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .get('/services/BIDataService?wsdl=wsdl0')
    .reply(200, biDataServiceWsdl0),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService?xsd=xsd0').reply(200, biDataServiceXsd0),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService?xsd=xsd1').reply(200, biDataServiceXsd1),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService?xsd=xsd2').reply(200, biDataServiceXsd2),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService?xsd=xsd3').reply(200, biDataServiceXsd3),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIDataService?xsd=xsd4').reply(200, biDataServiceXsd4),
  )
  .nock('https://servicet.ultipro.com', api =>
    api.get('/services/BIStreamingService').reply(200, biStreamingService),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .get('/services/BIStreamingService?wsdl=wsdl0')
    .reply(200, biStreamingServiceWsdl),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .get('/services/BIStreamingService?xsd=xsd0')
    .reply(200, biStreamingServiceXsd0),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .get('/services/BIStreamingService?xsd=xsd1')
    .reply(200, biStreamingServiceXsd1),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .get('/services/BIStreamingService?xsd=xsd2')
    .reply(200, biStreamingServiceXsd2),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .post('/services/BIDataService', logOnRequest)
    .reply(200, logOnResponseSuccess),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .post('/services/BIDataService', getReportParametersRequest)
    .reply(200, getReportParametersResponseSuccessNoParams),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .post('/services/BIDataService', executeReportRequest)
    .reply(200, executeReportResponseSuccess),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .post('/services/BIStreamingService', biStreamingServiceRequest)
    .reply(200, biStreamingServiceResponseCompleted),
  )
  .nock('https://servicet.ultipro.com', api =>
    api
    .post('/services/BIDataService', logOffRequest)
    .reply(200, logOffResponseSuccess),
  )
  .stdout()
  .command([
    'pull',
    'i22500177CDE54018AC31713BEBE2F644',
    '-u',
    'ServiceAccount',
    '-p',
    'u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342',
    '-c',
    'B5JLX',
    '-a',
    'BB7VDK0000K0',
    '-e',
    'servicet.ultipro.com',
  ])
  .it('starts a report pull using a report ID', ctx => {
    expect(ctx.stdout).to.contain('Starting a report pull...')
    // expect(ctx.stdout).to.contain('LogOn... Success | US-CORRELATION-ID: ')
    // expect(ctx.stdout).to.contain('GetReportParameters... Success | US-CORRELATION-ID: ')
    // expect(ctx.stdout).to.contain('RetrieveReport... Success | US-CORRELATION-ID: ')
    // expect(ctx.stdout).to.contain('LogOff... Success | US-CORRELATION-ID: ')
  })

  // test
  // .stdout()
  // .command(['pull', "/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']", '-u', 'ServiceAccount', '-p', '"u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342"', '-c', 'B5JLX', '-a', 'BB7VDK0000K0', '-e', 'rental4.ultipro.com'])
  // .it('starts a report pull using a report path', ctx => {
  //   expect(ctx.stdout).to.contain('Starting a report pull...')
  // })
})
