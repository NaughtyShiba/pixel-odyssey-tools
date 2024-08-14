build_image:
	docker build --tag po_tools .

start_local:
	docker run -d -p 3002:3002 --name po_tools_local po_tools

stop_local:
	docker kill po_tools_local; docker remove po_tools_local

logs_local:
	docker logs po_tools_local