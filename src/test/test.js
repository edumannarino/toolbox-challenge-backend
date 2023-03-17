/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { formatCSVtoJSON } from '../utils/formatter.js'
import app from '../index.js'

chai.use(chaiHttp)

describe('Backend', () => {
  describe('CSV Formatter', () => {
    it('Correct CSV', () => {
      const csv = 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\nfile1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5'
      const expected = {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          },
          {
            text: 'AtjW',
            number: 6,
            hex: 'd33a8ca5d36d3106219f66f939774cf5'
          }
        ]
      }
      const result = formatCSVtoJSON('file1.csv', csv)
      expect(result).to.deep.equal(expected)
    })

    it('Empty CSV', () => {
      const csv = ''
      const result = formatCSVtoJSON('file1.csv', csv)
      expect(result).to.be.undefined
    })

    it('Only Header CSV', () => {
      const csv = 'file,text,number,hex\n'
      const result = formatCSVtoJSON('file1.csv', csv)
      expect(result).to.be.undefined
    })

    it('Incorrect Name', () => {
      const csv = 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\nfile2.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5'
      const expected = {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      }
      const result = formatCSVtoJSON('file1.csv', csv)
      expect(result).to.deep.equal(expected)
    })

    it('Empty or Missing Column', () => {
      const csv = 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\nfile1.csv,AtjW,6,'
      const expected = {
        file: 'file1.csv',
        lines: [
          {
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }
        ]
      }
      const result = formatCSVtoJSON('file1.csv', csv)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('API', () => {
    it('Files Data (All Files)', (done) => {
      const expected = filesData
      chai.request(app)
        .get('/files/data')
        .end((err, res) => {
          if (err) {
            console.log(err.stack)
          }
          expect(res.status).to.be.equal(200)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })

    it('Files Data (File: test2.csv)', (done) => {
      const expected = [
        {
          file: 'test2.csv',
          lines: [
            {
              text: 'DzgnZkrVvDSjEwGTOMYGiipfF',
              number: 89,
              hex: '32d1f3e1b29a12e3036aae60aeb2bff0'
            }
          ]
        }
      ]
      chai.request(app)
        .get('/files/data?fileName=test2.csv')
        .end((err, res) => {
          if (err) {
            console.log(err.stack)
          }
          expect(res.status).to.be.equal(200)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })

    it('File List', (done) => {
      const expected = {
        files: [
          'test1.csv',
          'test2.csv',
          'test3.csv',
          'test18.csv',
          'test4.csv',
          'test5.csv',
          'test6.csv',
          'test9.csv',
          'test15.csv'
        ]
      }
      chai.request(app)
        .get('/files/list')
        .end((err, res) => {
          if (err) {
            console.log(err.stack)
          }
          expect(res.status).to.be.equal(200)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })
  })
})

const filesData = [
  {
    file: 'test2.csv',
    lines: [
      {
        text: 'DzgnZkrVvDSjEwGTOMYGiipfF',
        number: 89,
        hex: '32d1f3e1b29a12e3036aae60aeb2bff0'
      }
    ]
  },
  {
    file: 'test3.csv',
    lines: [
      {
        text: 'ueoxndBjnhVK',
        number: 4421768,
        hex: '24ea6f85a0ed28fe3a3e3fac7cfd69d7'
      },
      {
        text: 'lsScLFAitSillWGLpNjf',
        number: 9341,
        hex: 'bdf5481327ac3347011026ead303fae6'
      },
      {
        text: 'tbbykyZzfLg',
        number: 389759,
        hex: '048919802a6f9c2bd71a1c62de10938a'
      }
    ]
  },
  {
    file: 'test18.csv',
    lines: [
      {
        text: 'iOT',
        number: 6.025961085699034e+31,
        hex: 'jza588ec5abddb0c405925db4b25b5'
      },
      {
        text: 'MdQWDtoPTpvmTPBpMqEguhekm',
        number: 761395,
        hex: 'jz159c9b90793126b3b28887102fa5'
      },
      {
        text: 'AZlTl',
        number: 51160,
        hex: 'jzfa77fd5f51509e3d8d7146d4cc40'
      },
      {
        text: 'yXPtNd',
        number: 31,
        hex: 'jz1ab3c872a002d539474f8d774a47'
      },
      {
        text: 'RqFUHRvQeZJdgO',
        number: 437310809,
        hex: 'jzddad6f20550f00f81fcf5b5785e3'
      }
    ]
  },
  {
    file: 'test6.csv',
    lines: [
      {
        text: 'JBUYQoNhzKQYh',
        number: 520734608,
        hex: '39061ab59d1f2671cf549ea86d0c17bf'
      },
      {
        text: 'nNJuMiUCItzxiKoO',
        number: 15583918,
        hex: 'cd1af5ccc410d259454d034bb469277d'
      },
      {
        text: 'iRdJsmWKySwUPTpWqdWxicY',
        number: 51,
        hex: '5f32051ba51fac1fa6c6ebf6dd862186'
      },
      {
        text: 'CJixYBgdFfZlUxNPsrKSTpyNwoq',
        number: 68,
        hex: 'aab5c82402c1ea3841a20f0bb4df0928'
      },
      {
        text: 'UxHxJkXbRRVNZpxCqfhx',
        number: 953588,
        hex: '26ddce7ec1269c67346f31c64113c58f'
      },
      {
        text: 'ioOxdMILoFEfEMzSOySMCKjga',
        number: 860049204,
        hex: 'e538ded22f79772dd5cf0cc51fae3c51'
      },
      {
        text: 'clPhwaLWqtahmU',
        number: 565060,
        hex: '6ed9192be37bb792ba81ffe434489996'
      },
      {
        text: 'HBrxHIBGNbfhcANAOrShlgWn',
        number: 257,
        hex: 'f6edd82f261e5d9835201715ca0ab839'
      },
      {
        text: 'LparE',
        number: 27564519,
        hex: '15615a45e7a54e01030ba6e57628fb5e'
      },
      {
        text: 'kGEcPZdjdqP',
        number: 398,
        hex: '116941483756bd6a92565995599b1a6a'
      }
    ]
  },
  {
    file: 'test9.csv',
    lines: [
      {
        text: 'LzAiVyGvBlp',
        number: 125120,
        hex: '523683c3ac726b1c124d2337ced6e2f1'
      },
      {
        text: 'ypakJSRopSnMwh',
        number: 444432689,
        hex: '578cf6cd27137c78605bbc4dcbadb2aa'
      },
      {
        text: 'S',
        number: 7679,
        hex: 'e1b7bcf62dbe9b6dd9abcb358632e7a4'
      },
      {
        text: 'pYGOwNywbyWb',
        number: 3.6417846904509066e+31,
        hex: '5e51c63d03e2e475dac9348c66d23a83'
      },
      {
        text: 'qpD',
        number: 51624,
        hex: '327ccf3847f8d2906435cdb104a585bc'
      },
      {
        text: 'RqpBwY',
        number: 2381,
        hex: '93145932d5f13c5e680c52e04842b2cb'
      },
      {
        text: 'qWdGDmbnfAE',
        number: 2741,
        hex: '5d35b3adc21b0ccbe6eb8e4ee98dacd6'
      },
      {
        text: 'Bu',
        number: 1697951,
        hex: '5ae67b013951bca0e008f16ef8f38a84'
      },
      {
        text: 'qAYYlZJKdZgF',
        number: 540836,
        hex: '4d7f41b05ffd1058ddcad5acc15401b7'
      },
      {
        text: 'WSEXOYVQjcRxUwp',
        number: 527,
        hex: '1974f2250b41c016f909dd965f2da34d'
      },
      {
        text: 'DY',
        number: 9317,
        hex: 'b1e523723d7cdbd43f9cc5349422cf1f'
      },
      {
        text: 'ZiTkaTxAdpjVHLIEKrVrFTuqWYHdv',
        number: 418,
        hex: '91237e3feaabc85f645ed806a3779d73'
      }
    ]
  }
]
