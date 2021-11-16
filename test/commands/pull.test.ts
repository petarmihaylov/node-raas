import {expect, test} from '@oclif/test'

describe('pull', () => {
  test
  .stdout()
  .command(['pull', 'i22500177CDE54018AC31713BEBE2F644', '-u', 'ServiceAccount', '-p', '"u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342"', '-c', 'B5JLX', '-a', 'BB7VDK0000K0', '-e', 'rental4.ultipro.com'])
  .it('starts a report pull using a report ID', ctx => {
    expect(ctx.stdout).to.contain('Starting a report pull...')
  })

  test
  .stdout()
  .command(['pull', "/content/folder[@name='zzzCompany Folders']/folder[@name='Eastwood Industries - Master SC(72)']/folder[@name='UltiPro']/folder[@name='Customs']/report[@name='Audit Report 2']", '-u', 'ServiceAccount', '-p', '"u(3Unv0ERjlaksdjf*jfa89wfjklj23j!@3j423j#OI@^j2342"', '-c', 'B5JLX', '-a', 'BB7VDK0000K0', '-e', 'rental4.ultipro.com'])
  .it('starts a report pull using a report path', ctx => {
    expect(ctx.stdout).to.contain('Starting a report pull...')
  })
})
