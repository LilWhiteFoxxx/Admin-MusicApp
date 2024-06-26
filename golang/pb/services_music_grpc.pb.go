// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v5.26.1
// source: services_music.proto

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// MusicAppClient is the client API for MusicApp service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MusicAppClient interface {
	Login(ctx context.Context, in *UserLoginRequest, opts ...grpc.CallOption) (*UserLoginResponse, error)
	Authentication(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*AuthenticationResponse, error)
}

type musicAppClient struct {
	cc grpc.ClientConnInterface
}

func NewMusicAppClient(cc grpc.ClientConnInterface) MusicAppClient {
	return &musicAppClient{cc}
}

func (c *musicAppClient) Login(ctx context.Context, in *UserLoginRequest, opts ...grpc.CallOption) (*UserLoginResponse, error) {
	out := new(UserLoginResponse)
	err := c.cc.Invoke(ctx, "/pb.MusicApp/Login", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *musicAppClient) Authentication(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*AuthenticationResponse, error) {
	out := new(AuthenticationResponse)
	err := c.cc.Invoke(ctx, "/pb.MusicApp/Authentication", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MusicAppServer is the server API for MusicApp service.
// All implementations must embed UnimplementedMusicAppServer
// for forward compatibility
type MusicAppServer interface {
	Login(context.Context, *UserLoginRequest) (*UserLoginResponse, error)
	Authentication(context.Context, *emptypb.Empty) (*AuthenticationResponse, error)
	mustEmbedUnimplementedMusicAppServer()
}

// UnimplementedMusicAppServer must be embedded to have forward compatible implementations.
type UnimplementedMusicAppServer struct {
}

func (UnimplementedMusicAppServer) Login(context.Context, *UserLoginRequest) (*UserLoginResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Login not implemented")
}
func (UnimplementedMusicAppServer) Authentication(context.Context, *emptypb.Empty) (*AuthenticationResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Authentication not implemented")
}
func (UnimplementedMusicAppServer) mustEmbedUnimplementedMusicAppServer() {}

// UnsafeMusicAppServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MusicAppServer will
// result in compilation errors.
type UnsafeMusicAppServer interface {
	mustEmbedUnimplementedMusicAppServer()
}

func RegisterMusicAppServer(s grpc.ServiceRegistrar, srv MusicAppServer) {
	s.RegisterService(&MusicApp_ServiceDesc, srv)
}

func _MusicApp_Login_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UserLoginRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MusicAppServer).Login(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MusicApp/Login",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MusicAppServer).Login(ctx, req.(*UserLoginRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MusicApp_Authentication_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MusicAppServer).Authentication(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MusicApp/Authentication",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MusicAppServer).Authentication(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

// MusicApp_ServiceDesc is the grpc.ServiceDesc for MusicApp service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MusicApp_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "pb.MusicApp",
	HandlerType: (*MusicAppServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Login",
			Handler:    _MusicApp_Login_Handler,
		},
		{
			MethodName: "Authentication",
			Handler:    _MusicApp_Authentication_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services_music.proto",
}
