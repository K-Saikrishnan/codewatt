from dataclasses import dataclass, field
from datetime import datetime as dt
from uuid import UUID, uuid4

from litestar import Litestar, delete, get, post
from litestar.config.compression import CompressionConfig
from litestar.config.cors import CORSConfig
from litestar.dto import DataclassDTO, DTOConfig, DTOData
from litestar.exceptions import NotFoundException
from litestar.middleware.logging import LoggingMiddlewareConfig

cors_config = CORSConfig(allow_origins=['http://localhost:4200'])

logging_middleware_config = LoggingMiddlewareConfig()


@dataclass
class Idea:
  title: str
  description: str
  tags: list[str]
  idea_id: UUID = field(default_factory=uuid4)
  created_ts: dt = field(default_factory=dt.now)
  updated_ts: dt = field(default_factory=dt.now)


IDEA_LIST: list[Idea] = [
  Idea(
    title='Test Title 1',
    description='Test Description 1',
    tags=['tag1', 'tag2'],
  ),
  Idea(
    title='Test Title 2',
    description='Test Description 2',
    tags=['tag3', 'tag4'],
  ),
]


class ReadDTO(DataclassDTO[Idea]):
  config = DTOConfig(rename_strategy='camel')


class WriteDTO(DataclassDTO[Idea]):
  config = DTOConfig(exclude={'idea_id', 'created_ts', 'updated_ts'})


def get_idea_by_id(idea_id: uuid4) -> Idea:
  for item in IDEA_LIST:
    print(item.idea_id, idea_id)
    if item.idea_id == idea_id:
      return item
  raise NotFoundException(detail=f'Idea {idea_id} not found')


@get('/', summary='Get Ideas', return_dto=ReadDTO)
async def get_ideas() -> list[Idea]:
  return sorted(IDEA_LIST, key=lambda idea: idea.created_ts, reverse=True)


@post('/', summary='Add New Idea', dto=WriteDTO, return_dto=ReadDTO)
async def add_idea(data: DTOData[Idea]) -> list[Idea]:
  new_idea = data.create_instance(idea_id=uuid4(), created_ts=dt.now(), updated_ts=dt.now())

  IDEA_LIST.append(new_idea)
  return IDEA_LIST


@delete('/{idea_id:uuid}', summary='Delete Idea')
async def delete_idea(idea_id: UUID) -> None:
  print(IDEA_LIST)
  todo_item = get_idea_by_id(idea_id)
  IDEA_LIST.remove(todo_item)
  return None


app = Litestar(
  route_handlers=[get_ideas, add_idea, delete_idea],
  cors_config=cors_config,
  # logging_config=LoggingConfig(),
  #   middleware=[logging_middleware_config.middleware],
  compression_config=CompressionConfig(backend='gzip', gzip_compress_level=9),
)
