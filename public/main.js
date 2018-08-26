$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',
		function(data) {

			const width = 900
			const height = 600
		  let dataset = []
			const baseTemp = data.baseTemperature

			data.monthlyVariance.forEach((entry) => {
			    dataset.push([ entry.year, entry.month - 1, entry.variance ])
			})

			const maxYear = (d3.max(dataset, d => d[0]) + 2)
			const minYear = d3.min(dataset, d => d[0])
			const colorDomain = [ 1,2,3,4,5,6,7,8,9,10,11,12,13 ]
			const colorRange = [
				'#3d86d3',
				'#47a9c1',
				'#58d3c5',
				'#3fc18b',
				'#40c143',
				'#40c143',
				'#7fc141',
				'#7ec13f',
				'#a9c140',
				'#c4b121',
				'#d1801d',
				'#d1491b',
				'#d1361b'
		 ]

			let xScale = d3
				.scaleLinear()
				.domain([ minYear, maxYear ])
				.range([ 0, width ])

			let yScale = d3
				.scaleLinear()
				.domain([ 11 , 0 ])
				.range([ height  , 0 ])

			let colorScale = d3.scaleQuantile()
				.domain(colorDomain)
				.range(colorRange)

			let  tickFormatter = (month) => {
				let monthFormatter = d3.timeFormat('%B')
				return monthFormatter(new Date(minYear, month))
			}
			const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))
			const yAxis = d3.axisLeft(yScale).tickFormat(tickFormatter).tickSize([ 0 ])

			let svg = d3.select('.chart')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('padding', '20 20 100 80')

			svg
				.selectAll('rect')
      	.data(dataset)
      	.enter()
      	.append('rect')
      	.attr('x', d => xScale(d[0]))
      	.attr('y', d => yScale(d[1]))
				.attr('width', 4)
				.attr('height', (height/10))
				.attr('class', 'cell')
				.attr('fill', d => {
					 return colorScale(Math.floor(baseTemp + d[2]))
				})

			svg
				.append('g')
				.attr('transform', 'translate(0,'+ (height + 61)+')')
				.attr('id', 'x-axis')
				.call(xAxis)

			svg
				.append('g')
				.attr('transform', 'translate(0,'+(height/20)+')')
				.attr('id', 'y-axis')
				.call(yAxis)



		}
	)
})
