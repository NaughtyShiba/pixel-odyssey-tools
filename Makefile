build_image:
	docker build --tag po_tools .

start_local:
	docker run -d -p 3002:3002 --name po_tools_local po_tools

stop_local:
	docker kill po_tools_local; docker remove po_tools_local

rebuild_and_restart:
	docker kill po_tools_local; docker remove po_tools_local
	docker build --tag po_tools .
	docker run -d -p 3002:3002 --name po_tools_local po_tools

logs_local:
	docker logs po_tools_local
