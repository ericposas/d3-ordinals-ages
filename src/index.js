import * as d3 from 'd3'
import './style.scss'
import random from 'random'


window.start = () => {

	const makeData = () => ([
			{ ages: '0-10', number: random.int(1, 500), color: 'yellow' },
			{ ages: '11-20', number: random.int(1, 500), color: 'orange' },
			{ ages: '21-30', number: random.int(1, 500), color: 'darkorange' },
			{ ages: '31-40', number: random.int(1, 500), color: 'red' },
			{ ages: '41-50', number: random.int(1, 500), color: 'darkred' },
			{ ages: '51-60', number: random.int(1, 500), color: 'purple' },
			{ ages: '61-70', number: random.int(1, 500), color: 'blue' },
			{ ages: '71-80', number: random.int(1, 500), color: 'darkblue' }
		])

	let data = makeData()

	console.log(data.map(d => [d.ages, d.number]))

	let w = 800, h = 500, b = 60

	let scX = d3.scaleLinear()
	.domain([1, data.length])
	.range([b, w - b])

	let scOrdX = d3.scaleOrdinal()
	.domain(data.map(d => d.ages))
	.range(
		data.map((d, i) => scX(i+1))
	)

	let scY = d3.scaleLinear()
	.domain([1, 500])
	.range([h - b, b])

	let svg = d3.select('svg')
	.attr('width', w)
	.attr('height', h)
	.style('background-color', 'lightgrey')

	let barWidth = 40

	let bars = svg.append('g')
	.selectAll('line')
	.data(data).enter().append('line')
	.attr('x1', (d, i) => scX(i + 1))
	.attr('y1', h - (b/2))
	.attr('x2', (d, i) => scX(i + 1))
	.attr('y2', d => h - scY(d.number))
	.attr('stroke', d => d.color)
	.attr('stroke-width', barWidth)

	let xAx = d3.axisTop().scale(scOrdX)

	svg.append('g')
	.attr('transform', `translate(0, ${h})`)
	.call(xAx)

	let yAx = d3.axisRight().scale(scY)

	svg.append('g').call(yAx)

	svg
	.append('g')
	.append('text')
	.attr('x', 10)
	.attr('y', 20)
	.attr('class', 'graph-title')
	.text('Number of applicant by age group')

	const playToast = () => {
		let toast = document.createElement('div')
		toast.innerHTML = '<div>dataset changed!</div>'
		toast.classList.add('toast')
		document.body.appendChild(toast)
		setTimeout(() => {
			toast.classList.add('toast-out')
			setTimeout(() => document.body.removeChild(toast), 500)
		}, 1000)
	}

	let btn = document.createElement('btn')
	btn.innerHTML = 'Change data set'
	document.body.appendChild(btn)
	btn.classList.add('button')
	btn.onclick = () => {
		let data = makeData()
		let dur = 500
		bars.data(data)
		.attr('x1', (d, i) => scX(i + 1))
		.attr('y1', h - (b/2))
		.attr('x2', (d, i) => scX(i + 1))
		.transition().duration(dur)
		.attr('y2', d => h - scY(d.number))
		playToast()
	}

}
