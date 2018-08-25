$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',
		function(data) {

			const width = 900
			const height = 500
			const padding = 20
		  var dataset = []
			const baseTemp = data.baseTemperature

			data.monthlyVariance.forEach((entry) => {
			    dataset.push([ entry.year, entry.month - 1, entry.variance ])
			})

			const maxYear = d3.max(dataset, d => d[0])
			const minYear = d3.min(dataset, d => d[0])

			const maxVariance = d3.max(dataset, d => d[2])
			const minVariance = d3.min(dataset, d => d[2])
			console.log(maxVariance + ' '+ minVariance)


			var xScale = d3
				.scaleLinear()
				.domain([ minYear, maxYear ])
				.range([ 0, width ])

			var yScale = d3
				.scaleLinear()
				.domain([ 11 , 0 ])
				.range([ height , (height/12) ])

			// const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))
			// const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat(specifier))
			//
			var svg = d3.select('.chart')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('padding', padding)

			svg
				.selectAll('rect')
      	.data(dataset)
      	.enter()
      	.append('rect')
      	.attr('x', d => xScale(d[0]))
      	.attr('y', d => yScale(d[1]))
				.attr('width', 2)
				.attr('height', d => yScale(d[1]))
				.attr('fill', d => {
				  let circleColor =  d[1] == 2 ? '#6bff83' : '#f70018'
					 return circleColor
				})

		}
	)
})
